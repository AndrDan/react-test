import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { updateUser } from "../../redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import {
  PiHandCoins,
  PiHouseLine,
  PiImage,
  PiImages,
  PiMapPinLine,
  PiNotepad,
  PiRuler,
  PiXLight,
} from "react-icons/pi";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
} from "@mui/material";
import { pakistanCities } from "../../constant";
import { CFormSelect } from "@coreui/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen, type }) => {
  /////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch();
  const { currentEmployee, isFetching, error } = useSelector(
    (state) => state.user
  );

  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
  };

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
        { name: "email", label: "Email" },
        { name: "phone", label: "Phone", type: "number" },
      ],
      source: currentEmployee,
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
        { name: "email", label: "Email" },
        { name: "phone", label: "Phone", type: "number" },
      ],
      source: currentEmployee,
    },
  };
  const { title, fields, source } = userConfig[type] || {};

  /////////////////////////////////////// STATES ///////////////////////////////////////
  const [formData, setFormData] = useState(source || {});
  /////////////////////////////////////// USE EFFECT ///////////////////////////////////////
  useEffect(() => {
    setFormData(source || {});
  }, [source, type]);

  /////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(currentEmployee._id, formData, formData?.role));
    setFormData(initialEmployeeState);
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      scroll={"paper"}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Edit {title}</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>{title} Details</span>
          </div>
          <Divider />
          <table className="mt-4">
            {fields?.map((field) => (
              <tr key={field.name}>
                <td className="pb-4 text-lg">{field.label}</td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    type={field.type || "text"}
                    value={formData?.[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
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
  );
};

export default EditModal;
