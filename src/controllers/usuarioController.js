import Usuario from '../models/Usuario.js';

// Valida que "direcciones" sea un array de objetos con la estructura esperada.
// Devuelve un mensaje de error (string) si algo está mal, o null si todo está bien.
const validarDirecciones = (direcciones) => {
  if (direcciones === undefined) return null; // es opcional

  if (!Array.isArray(direcciones)) {
    return 'El campo "direcciones" debe ser un array';
  }

  const camposRequeridos = ['calle', 'ciudad', 'pais'];

  for (const [index, dir] of direcciones.entries()) {
    if (typeof dir !== 'object' || dir === null || Array.isArray(dir)) {
      return `El elemento en la posición ${index} de "direcciones" debe ser un objeto`;
    }

    for (const campo of camposRequeridos) {
      if (!dir[campo] || typeof dir[campo] !== 'string') {
        return `La dirección en la posición ${index} debe incluir el campo "${campo}" como texto`;
      }
    }
  }

  return null;
};

// POST /usuarios
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, edad, direcciones } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({
        error: 'Los campos "nombre" y "email" son requeridos',
      });
    }

    const errorDirecciones = validarDirecciones(direcciones);
    if (errorDirecciones) {
      return res.status(400).json({ error: errorDirecciones });
    }

    const usuario = new Usuario({ nombre, email, edad, direcciones });
    await usuario.save();

    return res.status(201).json(usuario);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: mensajes.join(', ') });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET /usuarios  (con paginación opcional: ?pagina=1&limite=10)
export const obtenerUsuarios = async (req, res) => {
  try {
    const pagina = Math.max(parseInt(req.query.pagina, 10) || 1, 1);
    const limite = Math.max(parseInt(req.query.limite, 10) || 10, 1);
    const skip = (pagina - 1) * limite;

    const [usuarios, total] = await Promise.all([
      Usuario.find().skip(skip).limit(limite).sort({ fecha_creacion: -1 }),
      Usuario.countDocuments(),
    ]);

    return res.status(200).json({
      total,
      pagina,
      limite,
      totalPaginas: Math.ceil(total / limite),
      usuarios,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET /usuarios/buscar?ciudad=Lima
export const buscarUsuariosPorCiudad = async (req, res) => {
  try {
    const { ciudad } = req.query;

    if (!ciudad) {
      return res.status(400).json({
        error: 'Debes indicar el parámetro "ciudad" en la query (ej: /usuarios/buscar?ciudad=Lima)',
      });
    }

    const usuarios = await Usuario.find({
      direcciones: {
        $elemMatch: { ciudad: { $regex: `^${ciudad}$`, $options: 'i' } },
      },
    });

    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET /usuarios/:id
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// PUT /usuarios/:id
export const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, edad, direcciones } = req.body;

    const errorDirecciones = validarDirecciones(direcciones);
    if (errorDirecciones) {
      return res.status(400).json({ error: errorDirecciones });
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, edad, direcciones },
      { new: true, runValidators: true, omitUndefined: true }
    );

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: mensajes.join(', ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// DELETE /usuarios/:id
export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
