import Vet from "../models/vet.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandle.js";

export const getVets = async (req, res, next) => {
  try {
    const resPerPage = 4;
    const apiFilters = new APIFilters(Vet, req.query).search().filters();

    let vets = await apiFilters.query;
    let filteredVetsCount = vets.length;

    apiFilters.pagination(resPerPage);
    vets = await apiFilters.query.clone();

    res.status(200).json({
      resPerPage,
      filteredVetsCount,
      vets,
    });
  } catch (err) {
    next(err);
  }
};

export const newVet = async (req, res, next) => {
  try {
    const vet = await Vet.create(req.body);

    res.status(201).json({
      vet,
    });
  } catch (err) {
    next(err);
  }
};

export const getVetbyID = async (req, res, next) => {
  try {
    const vet = await Vet.findById(req?.params?.id);

    if (!vet) {
      return next(new ErrorHandler("Cadastro não encontrado", 404));
    }

    res.status(200).json({
      vet,
    });
  } catch (err) {
    next(err);
  }
};

export const updateVetbyID = async (req, res, next) => {
  try {
    let vet = await Vet.findById(req?.params?.id);

    if (!vet) {
      return next(new ErrorHandler("Cadastro não encontrado", 404));
    }

    vet = await Vet.findByIdAndUpdate(req?.params?.id, req.body, {
      new: true,
    });

    res.status(200).json({
      vet,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteVetbyID = async (req, res, next) => {
  try {
    const vet = await Vet.findById(req?.params?.id);

    if (!vet) {
      return next(new ErrorHandler("Cadastro não encontrado", 404));
    }

    await vet.deleteOne();

    res.status(200).json({
      message: "Cadastro deletado",
    });
  } catch (err) {
    next(err);
  }
};
