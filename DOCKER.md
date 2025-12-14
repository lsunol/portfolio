# Docker Setup para Portfolio

Este proyecto se puede ejecutar usando Docker y Docker Compose de dos maneras:

## 🚀 Modo Producción

Para construir y ejecutar la versión optimizada de producción:

```bash
# Construir y levantar el contenedor
docker-compose up --build

# O en modo detached (segundo plano)
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

La aplicación estará disponible en http://localhost:3500

## 🔧 Modo Desarrollo (con hot-reload)

Para desarrollo con recarga automática de cambios:

```bash
# Construir y levantar el contenedor de desarrollo
docker-compose -f docker-compose.dev.yml up --build

# O en modo detached
docker-compose -f docker-compose.dev.yml up -d --build

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Detener
docker-compose -f docker-compose.dev.yml down
```

Los cambios en el código se reflejarán automáticamente.

## 🛠️ Comandos útiles

```bash
# Reconstruir sin usar caché
docker-compose build --no-cache

# Entrar al contenedor
docker exec -it portfolio-app sh

# Ver contenedores activos
docker-compose ps

# Limpiar todo (contenedores, imágenes, volúmenes)
docker-compose down -v --rmi all
```

## 📁 Archivos Docker

- **Dockerfile**: Build multi-stage optimizado para producción
- **Dockerfile.dev**: Build simplificado para desarrollo
- **docker-compose.yml**: Configuración de producción
- **docker-compose.dev.yml**: Configuración de desarrollo con volúmenes
- **.dockerignore**: Archivos excluidos del contexto de build

## ⚙️ Variables de entorno

Si necesitas variables de entorno personalizadas, puedes:

1. Crear un archivo `.env` en la raíz del proyecto
2. Añadir las variables en el archivo `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - TU_VARIABLE=valor
```

O usar un archivo externo:

```yaml
env_file:
  - .env
```

## 🔍 Troubleshooting

### El contenedor no inicia
- Verifica que el puerto 3500 no esté en uso: `netstat -ano | findstr :3500` (Windows)
- Revisa los logs: `docker-compose logs`

### Los cambios no se reflejan en desarrollo
- Asegúrate de usar `docker-compose.dev.yml`
- Verifica que los volúmenes estén montados correctamente

### Error de permisos
- En Windows con WSL2, asegúrate de que el proyecto esté en el filesystem de WSL2
