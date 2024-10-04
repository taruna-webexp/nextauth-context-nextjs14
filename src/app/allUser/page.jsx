"use client";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Sheet } from "@mui/joy";
import useLocalStorage from "use-local-storage";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/component/shared/form/formData";
import TablePage from "@/component/Table/Table";
import { successMsg } from "@/component/Toastmsg/toaster";
import { FormValidation } from "@/component/validation/loginformValidation";

export default function UserData() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(FormValidation) });

  const [userData, setUserData] = useLocalStorage("userData", []);
  const { tableData, setTableData } = useContext(UserContext);
  const data = JSON.parse(tableData) || [];
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Formdata is submitted in table grid
  const onSubmit = (formData) => {
    try {
      const updatedData =
        editIndex !== null
          ? data.map((item, index) => (index === editIndex ? formData : item))
          : [...data, formData];

      setUserData(updatedData);
      localStorage.setItem("userData", JSON.stringify(updatedData));
      setTableData(JSON.stringify(updatedData));

      reset();
      setEditIndex(null);
      handleClose();

      successMsg(
        editIndex !== null
          ? "Data is updated successfully"
          : "Data is added successfully"
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setTableData(storedUserData);
    }
  }, [setTableData]);

  // edit table row
  const handleEdit = (index) => {
    reset(data[index]);
    setEditIndex(index);
    setOpen(true);
  };

  // delete table row
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setTableData(JSON.stringify(updatedData));
    successMsg("Data is deleted successfully");
  };

  // modal open
  const handleOpen = () => {
    setEditIndex(null);
    setOpen(true);
    reset({
      name: "",
      email: "",
      number: "",
      password: "",
    });
    // reset({ ...tableData });
  };

  // modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="grid justify-items-end">
            <Button
              onClick={handleClose}
              className="mt-4 text-black py-2 px-4 rounded hover:bg-white"
            >
              <CloseIcon />
            </Button>
          </div>
          <Sheet
            sx={{
              width: 500,
              mx: "auto",
              my: 4,
              py: 3,
              px: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "sm",
              boxShadow: "md",
            }}
            variant="outlined"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                control={control}
                name="name"
                label="Name"
                placeholder="Name"
                inputType="text"
                className="mt-4"
                id="name"
                errors={errors}
              />
              <FormInput
                control={control}
                name="email"
                label="Email"
                className="mt-4"
                placeholder="Email"
                inputType="email"
                id="email"
                errors={errors}
              />
              <FormInput
                control={control}
                name="number"
                className="mt-4"
                label="Contact Number"
                placeholder="Number"
                inputType="tel"
                id="number"
                errors={errors}
              />
              <FormInput
                control={control}
                name="password"
                id="password"
                label="Password"
                className="mt-4"
                placeholder="Password"
                inputType="password"
                errors={errors}
              />
              <Button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                type="submit"
              >
                {editIndex !== null ? "Update" : "Submit"}
              </Button>
            </form>
          </Sheet>
        </Box>
      </Modal>
      <Container>
        <div className="grid justify-items-center">
          <Button
            onClick={handleOpen}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Add User
          </Button>
        </div>
        <br />
        <TablePage
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={data}
        />
      </Container>
    </>
  );
}
