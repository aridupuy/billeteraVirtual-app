# Billetera Virtual App

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Descripción

Este repositorio contiene la aplicación principal de la billetera virtual, construida con Ionic y Angular. La aplicación está diseñada para gestionar transacciones, usuarios y otras funcionalidades clave relacionadas con el manejo de dinero digital.

## Características

- **Gestión de usuarios**: Permite el registro y autenticación de usuarios.
- **Transacciones seguras**: Facilita el envío y recepción de dinero con alta seguridad.
- **Interfaz intuitiva**: Ofrece una experiencia de usuario amigable y fácil de navegar.
- **Integración con APIs**: Conecta con servicios externos para realizar operaciones financieras.

## Instalación

Para usar esta aplicación, asegúrate de tener [Node.js](https://nodejs.org/) y [Ionic CLI](https://ionicframework.com/docs/cli) instalados en tu sistema. Luego, clona el repositorio y ejecuta:

```bash
git clone https://github.com/aridupuy/billeteraVirtual-app.git
cd billeteraVirtual-app
npm install
```

## Uso

Para ejecutar la aplicación correctamente, sigue estos pasos:

1. **Ejecuta la aplicación en modo de desarrollo**:
   Para iniciar la aplicación, ejecuta:

   ```bash
   ionic serve
   ```

   Esto abrirá la aplicación en tu navegador predeterminado en `http://localhost:8100`.

2. **Construye la aplicación para producción**:
   Si deseas compilar la aplicación para producción, usa:

   ```bash
   ionic build --prod
   ```

3. **Prueba en dispositivos móviles con Cordova**:
   Para probar la aplicación en un dispositivo móvil, primero asegúrate de tener instalado [Apache Cordova](https://cordova.apache.org/) y luego ejecuta:

   ```bash
   ionic cordova build android
   ```

   o

   ```bash
   ionic cordova build ios
   ```

Asegúrate de tener todas las configuraciones y permisos necesarios para ejecutar la aplicación en dispositivos móviles.

## Solución de Problemas

Si experimentas problemas al instalar o ejecutar la aplicación, considera lo siguiente:

1. **Verifica tu conexión a Internet**: Asegúrate de que tu conexión esté activa y estable.

2. **Limpia la caché de npm**:
```bash
npm cache clean --force
```

3. **Actualiza npm**: Asegúrate de que estás usando la última versión de npm:
```bash
npm install -g npm
```

4. **Revisa tu archivo package.json**: Asegúrate de que esté bien configurado y no contenga errores de sintaxis. Usa el siguiente comando para validar:
```bash
npm audit
```

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Autores

- **Ariel Dupuy** - [aridupuy](https://github.com/aridupuy)

## Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue en el repositorio o contactarme directamente.
