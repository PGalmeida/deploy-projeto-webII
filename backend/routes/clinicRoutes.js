import express from "express";
import { clinicService } from "../services/clinicService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const clinic = await clinicService.create(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar clínica" });
  }
});

router.get("/", async (req, res) => {
  try {
    const clinics = await clinicService.list();
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar clínicas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const clinic = await clinicService.getById(req.params.id);
    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clínica" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const clinic = await clinicService.update(req.params.id, req.body);
    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar clínica" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await clinicService.delete(req.params.id);
    res.status(200).json({ message: "Clínica deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar clínica" });
  }
});

export default router;
