import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, createClient } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";
import { error } from "../../redux/reducer/user";
import _ from "lodash";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll, type }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userConfig = {
    employee: {
      title: "Employee",
      initialState: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        phone: "",
        email: "",
      },
      fields: [
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "username", label: "Username" },
        { name: "email", label: "Email", optional: true },
        { name: "password", label: "Password", type: "password" },
        { name: "phone", label: "Phone", type: "number" },
      ],
    },
    client: {
      title: "Client",
      initialState: {
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        email: "",
      },
      fields: [
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "username", label: "Username" },
        { name: "email", label: "Email", optional: true },
        { name: "phone", label: "Phone", type: "number" },
      ],
    },
  };

  const { title, fields, initialState } = userConfig[type] || {};

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [formData, setFormData] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState({});

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////
  useEffect(() => {
    if (!open) setFormData(initialState);
  }, [open, initialState]);

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    fields.forEach((field) => {
      if (!field.optional && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });

    if (!_.isEmpty(errors)) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    switch (type) {
      case "employee":
        dispatch(createEmployee(formData, setOpen));
        break;

      case "client":
        dispatch(createClient(formData, setOpen));
        break;

      default:
        break;
    }

    setFormData(initialState);
  };

  const handleChange = (field, value) => {
    setFormData((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialState);
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New {title}</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>{title} Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              {fields.map((field) => (
                <tr key={field.name} className="pb-4 align-top">
                  <td className="text-lg">{field.label}</td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      type={field.type || "text"}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      error={!!validationErrors?.[field.name]}
                      placeholder={field.optional ? "Optional" : " "}
                      helperText={validationErrors?.[field.name] || " "}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
          >
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateUser;
