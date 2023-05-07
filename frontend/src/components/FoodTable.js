import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
  } from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

const FoodTable = (props) => {
    const { user } = props;

    const [open, setOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [newServingSize, setNewServingSize] = useState(0);
    const [updatedFoodData, setUpdatedFoodData] = useState(null);

    // get the user's all saved food
    useEffect(() => {
        fetch("/selectAllFood", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "username": user }),
            })
            .then(response =>{
                if (response.ok) {
                return response.json();
                } else{
                throw new Error("Reponse is not OK");
                }
        })
        .then(data => {
            console.log(data);
            setUpdatedFoodData(data);
        })
        .catch(error => {
            console.log(error)
        });
    }, []);

    const handleEditClick = (foodName, servingSize) => {
        setSelectedFood(foodName);
        // Make the input box number equal to the current serving size
        setNewServingSize(servingSize);
        setOpen(true);
    };
    
    const handleEditSubmit = () => {
        //handleEdit(selectedFood.id, newServingSize);
        const updatedFoodData = {
            "username": user,
            "foodName": selectedFood,
            "update": newServingSize
        }
        fetch("/updateFood", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            /** TODO: Replace here with user's email  */
            body: JSON.stringify(updatedFoodData),
            })
            .then(response =>{
                if (response.ok) {
                    return response.json();
                } else{
                /** TODO: Implement the 404 and catch the error  */
                throw new Error("Reponse is not OK");
                }
        })
        .then(data => {
            console.log(data);
            setUpdatedFoodData(data);
        })
        .catch(error => {
            console.log(error)
        });

        setOpen(false);
    };

    const handleDelete = (foodName) => {
        const deleteFoodData = {
            "username": user,
            "foodName": foodName,
        }
        fetch("/deleteFood", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deleteFoodData),
            })
            .then(response =>{
                if (response.ok) {
                    return response.json();
                } else{
                throw new Error("Reponse is not OK");
                }
        })
        .then(data => {
            console.log(data);
            setUpdatedFoodData(data);
        })
        .catch(error => {
            console.log(error)
        });

        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleServingSizeChange = (event) => {
        setNewServingSize(event.target.value);
    };

    return (
    <>
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                <TableCell>Food Name</TableCell>
                <TableCell align="right">Serving Size</TableCell>
                <TableCell align="right">Calorie Data</TableCell>
                <TableCell align="right">Total Calories</TableCell>
                <TableCell align="right">Actions</TableCell> {/* Add new column for actions */}
                </TableRow>
            </TableHead>
            <TableBody>
                {updatedFoodData && updatedFoodData.map((item) => (
                <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                    {item.foodName}
                    </TableCell>
                    <TableCell align="right">{item.servingSize}</TableCell>
                    <TableCell align="right">{item.calorieData}</TableCell>
                    <TableCell align="right">{item.totalCalories}</TableCell>
                    <TableCell align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ () => handleEditClick(item.foodName, item.servingSize) }
                            style={{marginRight: '5px'}}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(item.foodName)}
                        >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    <Dialog open={open}>
        <DialogTitle>Edit Serving Size</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            label="Serving Size"
            type="number"
            fullWidth
            value={newServingSize}
            onChange={handleServingSizeChange}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel} color="primary">
            Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
            Save
            </Button>
        </DialogActions>
    </Dialog>
    </>
    )
}

export default FoodTable;