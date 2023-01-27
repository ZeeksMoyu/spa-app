import React from 'react';
import classes from "./Products.module.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface ProductRowParams{
    item: any
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 0,
};
const ProductRow: React.FC<ProductRowParams>= ({item}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div onClick={handleOpen} className={classes.row} style={{background: item.color}}>
                <div className={classes.tableItem}>{item.id}</div>
                <div className={classes.tableItem}>{item.name}</div>
                <div className={classes.tableItem}>{item.year}</div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <Box sx={style}>
                    <div onClick={handleOpen} className={classes.row} style={{background: item.color}}>
                        <div className={classes.tableItem}>{item.id}</div>
                        <div className={classes.tableItem}>{item.name}</div>
                        <div className={classes.tableItem}>{item.year}</div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ProductRow;