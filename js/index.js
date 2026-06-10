/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // 1. Solicitar permisos (Obligatorio para iOS y Android 13+)
    window.FirebasePlugin.grantPermission(function(hasPermission){
        console.log("Permisos de notificación concedidos: " + hasPermission);
    }, function(error){
        console.error("Error al solicitar permisos: " + error);
    });

    // 2. Obtener el Token FCM del dispositivo
    // Este token es único para este dispositivo y es lo que tu backend 
    // necesita para enviarle notificaciones específicas.
    window.FirebasePlugin.getToken(function(token) {
        console.log("FCM Token: " + token);
        // TODO: Enviar este token a tu servidor/base de datos
    }, function(error) {
        console.error("Error al obtener el token: " + error);
    });

    // 3. Escuchar las actualizaciones del Token
    // Firebase rota los tokens ocasionalmente, debes actualizarlo en tu backend
    window.FirebasePlugin.onTokenRefresh(function(token) {
        console.log("FCM Token actualizado: " + token);
        // TODO: Actualizar el token en tu servidor
    }, function(error) {
        console.error("Error al refrescar el token: " + error);
    });

    // 4. Manejar la recepción de notificaciones
    window.FirebasePlugin.onMessageReceived(function(message) {
        console.log("Notificación recibida: ", message);
        
        if (message.tap) {
            // La app estaba en segundo plano (background) y el usuario tocó la notificación.
            // Aquí puedes redirigir a una pantalla específica de tu app.
            console.log("El usuario tocó la notificación");
        } else {
            // La app estaba abierta (foreground) cuando llegó la notificación.
            // Por defecto no se muestra la alerta en la barra del sistema si la app está abierta,
            // así que puedes mostrar un Toast o un Alert personalizado aquí.
            console.log("Notificación recibida en primer plano");
            alert("Nueva notificación: " + message.body);
        }
    }, function(error) {
        console.error("Error al recibir el mensaje: " + error);
    });
}
