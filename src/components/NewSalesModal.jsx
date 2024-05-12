import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import useStockRequest from "../services/useStockRequests";
import { useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};
const styleInput = {
  margin: 1,
  width: "100%",
};


export default function NewSalesModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const brandsData = useSelector((item) => item.stock.brands);
  const [salesModal, setSalestModal] = React.useState({
    brandId: "",
    productId: "",
    quantity: 0,
    "price": 0,
  })

  const {createFirmsStock} = useStockRequest()
console.log(brandsData)
  const handleSelectChange = (e) => {
    setSalestModal((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    createFirmsStock("sales", salesModal);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "black",
          marginBottom: "10px",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
            transform: "scale(0.9)",
            transition: "all 0.2s ease",
          },
        }}
      >
        NEW PRODUCT
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-1">Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label-1"
                id="demo-simple-select-1"
                value={salesModal.brandId}
                label="Brand"
                name="brandId"
                required
                onChange={handleSelectChange}
                sx={styleInput}
              >
                <MenuItem value={"65343222b67e9681f937f123"}>ÜLKER</MenuItem>
                <MenuItem value={"65343222b67e9681f937f202"}>APPLE</MenuItem>
                <MenuItem value={"65343222b67e9681f937f201"}>Food</MenuItem>
                <MenuItem value={"65343222b67e9681f937f204"}>Electronic</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-2">Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label-2"
                id="demo-simple-select-2"
                value={salesModal.brandId}
                label="Brand"
                name="brandId"
                required
                onChange={handleSelectChange}
                sx={styleInput}
              >
          {
            brandsData?.map((brand) => (
              <MenuItem value={brand._id}>{brand.name}</MenuItem>
              
            ))
          }
              </Select>
            </FormControl>
            <TextField
              label="Product Name"
              id="outlined-basic"
              value={salesModal.name}
              required
              onChange={handleSelectChange}
              name="name"
              sx={styleInput}
            />
            <Button
              type="submit"
              variant="contained"
              sx={styleInput} 
            >
              ADD PRODUCT
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}