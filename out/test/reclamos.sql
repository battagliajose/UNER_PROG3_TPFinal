
 tabla `reclamos` (
  `idReclamo` int(11) NOT NULL,
  `asunto` varchar(256) NOT NULL,
  `descripcion` varchar(256) DEFAULT NULL,
  `fechaCreado` datetime NOT NULL,
  `fechaFinalizado` datetime DEFAULT NULL,
  `fechaCancelado` datetime DEFAULT NULL,
  `idReclamoEstado` int(11) NOT NULL,
  `idReclamoTipo` int(11) NOT NULL,
  `idUsuarioCreador` int(11) NOT NULL,
  `idUsuarioFinalizador` int(11) DEFAULT NULL

--
