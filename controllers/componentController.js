import { Component } from '../models/Component.js';

// Get: Obtener todos los componentes (con búsqueda y filtros opcionales)
export const getComponents = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Búsqueda insensible a mayúsculas
    }

    const components = await Component.find(query).sort({ createdAt: -1 });
    res.status(200).json(components);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los componentes', error: error.message });
  }
};

// Get: Obtener un solo componente por ID
export const getComponentById = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Componente no encontrado' });
    }
    res.status(200).json(component);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el componente', error: error.message });
  }
};

// Post: Crear un nuevo componente
export const createComponent = async (req, res) => {
  try {
    const newComponent = new Component(req.body);
    const savedComponent = await newComponent.save();
    res.status(201).json(savedComponent);
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar el componente', error: error.message });
  }
};

// Put: Actualizar un componente existente
export const updateComponent = async (req, res) => {
  try {
    const updatedComponent = await Component.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedComponent) {
      return res.status(404).json({ message: 'Componente no encontrado' });
    }
    res.status(200).json(updatedComponent);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el componente', error: error.message });
  }
};

// Delete: Eliminar un componente
export const deleteComponent = async (req, res) => {
  try {
    const deletedComponent = await Component.findByIdAndDelete(req.params.id);
    if (!deletedComponent) {
      return res.status(404).json({ message: 'Componente no encontrado' });
    }
    res.status(200).json({ message: 'Componente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el componente', error: error.message });
  }
};