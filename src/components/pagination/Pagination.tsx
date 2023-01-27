import React from 'react';
import Button from '@mui/material/Button';
import classes from './Pagination.module.css'

interface Props {
    currentPage: number;
    setCurrentPage: (newPage: number) => void;
    totalPages: number | undefined
    id: number | undefined
}

const Pagination: React.FC<Props> = ({ currentPage, setCurrentPage, totalPages, id }) => {
    return (
        <div className={classes.controlZone}>
            <Button className={classes.button} variant="contained" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1 || id !== undefined}>
                Previous
            </Button>
            <Button className={classes.button} variant="contained" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || id !== undefined}>Next</Button>
        </div>
    );
};

export default Pagination;