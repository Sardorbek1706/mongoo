import { Schema, model } from "mongoose";

const districtSchema = new Schema({
  name: { type: String, required: true },
});

const DistrictModel = model("district", districtSchema);

export default DistrictModel;
