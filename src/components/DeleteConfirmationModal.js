import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const DeleteConfirmationModal = ({ id, onClose, onDelete }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://localhost:7074/api/Movie/DeleteMovie/${id}`);
            handleClose();
            onDelete();
            window.location.reload(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button type="button" className="btn btn-warning" onClick={() => setShow(true)} style={{ background: "red" }}>
                Delete
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this movie?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteConfirmationModal;
