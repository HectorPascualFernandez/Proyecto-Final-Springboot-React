# 🎮 Tienda de Videojuegos - Sistema de Gestión Completo

![GitHub last commit](https://img.shields.io/github/last-commit/tu-usuario/tienda-videojuegos)
![GitHub top language](https://img.shields.io/github/languages/top/tu-usuario/tienda-videojuegos)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.0-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![JWT](https://img.shields.io/badge/JWT-Auth-yellow)

> [!NOTE]
> Aplicación web full-stack para la gestión completa de una tienda de videojuegos, desarrollada con Spring Boot (backend) y React (frontend).

## 📋 Características

> [!TIP]
> El sistema incluye todas las funciones necesarias para gestionar una tienda de videojuegos de forma completa:

- **Gestión de Inventario**: Administra el catálogo completo de videojuegos
- **Categorización**: Organización por géneros y tipos de juegos
- **Registro de Ventas**: Seguimiento de todas las transacciones
- **Autenticación JWT**: Sistema de seguridad robusto con roles (ADMIN/USER)
- **API REST**: Arquitectura escalable y bien organizada
- **Interfaz Moderna**: UI intuitiva y responsive con React

## 🚀 Puesta en Marcha

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tu-usuario/tienda-videojuegos/main/docs/assets/setup-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/tu-usuario/tienda-videojuegos/main/docs/assets/setup-light.png">
  <img alt="Diagrama de configuración" src="https://raw.githubusercontent.com/tu-usuario/tienda-videojuegos/main/docs/assets/setup-light.png">
</picture>

### Requisitos Previos

- Java 11+
- Node.js 14+
- MySQL/MariaDB
- Maven
- IntelliJ IDEA (recomendado)
- XAMPP/WAMP/MAMP (para PHPMyAdmin)

### Configuración de la Base de Datos

> [!IMPORTANT]
> Este paso es esencial. La aplicación requiere una base de datos MySQL configurada correctamente.

1. **Inicia tu servidor MySQL y PHPMyAdmin**:
   ```
   # Usando XAMPP, WAMP o MAMP
   # O directamente desde la línea de comandos
   ```

2. **Crea una base de datos**:
   - Nombre: `tienda_videojuegos`
   - Cotejamiento: `utf8mb4_unicode_ci`

   ```sql
   CREATE DATABASE tienda_videojuegos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Configura las credenciales** en `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/tienda_videojuegos
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contraseña
   spring.jpa.hibernate.ddl-auto=update
   ```

### Iniciar el Backend (Spring Boot)

1. **Abre el proyecto en IntelliJ IDEA**:
   - Abre la carpeta `tienda`

2. **Instala las dependencias Maven**:
   ```bash
   mvn clean install
   ```

3. **Ejecuta la aplicación**:
   - Desde IntelliJ: Busca la clase principal con `@SpringBootApplication` y ejecútala
   - O vía terminal:
     ```bash
     mvn spring-boot:run
     ```

4. **Verifica que el servidor esté funcionando**:
   - API disponible en: `http://localhost:8080/api`
   - Endpoints de prueba: `http://localhost:8080/api/categorias`

### Iniciar el Frontend (React)

1. **Abre una terminal y navega a la carpeta del frontend**:
   ```bash
   cd tienda-frontend
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia la aplicación**:
   ```bash
   npm start
   ```

4. **Accede a la aplicación**:
   - UI disponible en: `http://localhost:3000`

## 🔒 Autenticación

<details open>
  <summary><b>Sistema de seguridad JWT</b></summary>
  
  El sistema implementa seguridad basada en JWT (JSON Web Tokens).

  ### Registro de usuario
  - Endpoint: POST `/api/users/register`
  - Cuerpo:
    ```json
    {
      "username": "tu_usuario",
      "password": "tu_contraseña"
    }
    ```
</details>

  ### Inicio de sesión
  - Endpoint: POST `/api/auth/login`
  - Cuerpo:
    ```json
    {
      "username": "tu_usuario",
      "password": "tu_contraseña"
    }
    ```
  - Respuesta: Token JWT en el header `Authorization` y en el cuerpo

  ### Roles y Permisos
  - **ROLE_ADMIN**: Acceso completo a todas las operaciones
  - **ROLE_USER**: Acceso limitado a operaciones de lectura y algunas de escritura
</details>

## 📚 Estructura de la API

<details>
  <summary>Endpoints disponibles</summary>

  ### Categorías
  - Base URL: `/api/categorias`
  - Operaciones CRUD completas

  ### Videojuegos
  - Base URL: `/api/videojuegos`
  - Filtrado por categoría: GET `/api/videojuegos/categoria/{categoriaId}`
  - Operaciones CRUD completas

  ### Ventas
  - Base URL: `/api/ventas`
  - Filtrado por videojuego: GET `/api/ventas/videojuego/{videojuegoId}`
  - Filtrado por fecha: GET `/api/ventas/fecha/{fecha}`
</details>

## 🧪 Solución de problemas comunes

> [!WARNING]
> Si encuentras problemas al ejecutar la aplicación, aquí hay algunas soluciones comunes:

### Backend

- **Error de conexión a la base de datos**:
  - Verifica las credenciales en `application.properties`
  - Asegúrate de que el servidor MySQL esté en ejecución
  - Comprueba el nombre de la base de datos

- **Error en dependencias Maven**:
  ```bash
  mvn clean install -U
  ```

- **Limpiar node.exe bloqueado**:
  ```bash
  taskkill /F /IM node.exe
  ```

### Frontend

- **Error de módulos no encontrados**:
  ```bash
  npm install
  ```

- **Puerto 3000 en uso**:
  - Termina el proceso que lo está usando o
  - Usa otro puerto:
    ```bash
    npm start -- --port 3001
    ```

## 📁 Estructura del Proyecto

<details>
  <summary><b>Estructura de directorios</b></summary>

  ### Backend (Spring Boot)

  ```
  tienda/
  ├── src/main/java/com/tienda/
  │   ├── controllers/       # Controladores REST (CategoriaController, etc.)
  │   ├── models/            # Entidades JPA (Categoria, Videojuego, Venta)
  │   ├── repositories/      # Interfaces de repositorio Spring Data JPA
  │   ├── services/          # Servicios con lógica de negocio
  │   ├── security/          # Configuración JWT y seguridad
  │   └── TiendaApplication.java  # Clase principal
  ├── src/main/resources/
  │   └── application.properties  # Configuración de la aplicación
  └── pom.xml                # Dependencias y configuración Maven
  ```

  ### Frontend (React)

  ```
  tienda-frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   │   ├── auth/          # Componentes de autenticación
  │   │   ├── common/        # Componentes comunes (Navbar, etc.)
  │   │   ├── categorias/    # Componentes de gestión de categorías
  │   │   ├── videojuegos/   # Componentes de gestión de videojuegos
  │   │   └── ventas/        # Componentes de gestión de ventas
  │   ├── services/          # Servicios para comunicación con API
  │   ├── context/           # Contextos de React (AuthContext, etc.)
  │   ├── App.js
  │   └── index.js
  └── package.json          # Dependencias y scripts
  ```
</details>

## 👨‍💻 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

<details>
  <summary>Guía de estilo de código</summary>
  
  ### Backend (Java)
  - Sigue las convenciones de nomenclatura de Java
  - Utiliza 4 espacios para la indentación
  - Documenta todas las clases y métodos públicos
  
  ### Frontend (JavaScript)
  - Utiliza ES6+ y hooks de React
  - Sigue las prácticas de componentes funcionales
  - Documenta las props de los componentes
</details>

<details>
  <summary>Plan de desarrollo futuro</summary>
  
  - Implementación de dashboard con estadísticas
  - Funcionalidad de búsqueda avanzada
  - Integración con pasarelas de pago
  - Generación de informes en PDF
</details>

## 📜 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

⭐️ **¡Si te resulta útil este proyecto, no olvides darle una estrella!** ⭐️
