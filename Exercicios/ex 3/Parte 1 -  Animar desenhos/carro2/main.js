function main(){
    const canvas = document.querySelector("#canvas");
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
  
    if (!gl) {
        throw new Error('WebGL not supported');
    }
  
    var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
  
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  
    var program = createProgram(gl, vertexShader, fragmentShader);
  
    gl.useProgram(program);
  
    const positionBuffer = gl.createBuffer();
  
    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    const matrixUniformLocation = gl.getUniformLocation(program, `matrix`);
    const colorUniformLocation = gl.getUniformLocation(program, `color`);
    
    let matrix = m4.identity();
    matrix = m4.scale(matrix,0.25,0.25,1.0);
    gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);
  
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    let positionVector = [
        -0.5,-0.5,
        -0.5, 0.5,
         0.5,-0.5,
        -0.5, 0.5,
         0.5,-0.5,
         0.5, 0.5,
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionVector), gl.STATIC_DRAW);
    
    let colorVector = [Math.random(),Math.random(),Math.random()];
    gl.uniform3fv(colorUniformLocation,colorVector);
  
    let theta = 0.0;
    let tx = 0.0;
    let ty = 0.0;
    let tx_step = 0.01;
    let ty_step = 0.02;
    let n = 50;

  

    function drawCar(){
        gl.clear(gl.COLOR_BUFFER_BIT);


        theta += 1.0;
        if(tx > 1.0 || tx < -1.0)
          tx_step = -tx_step;
        tx += tx_step;
        //if(ty > 1.0 || ty < -1.0)
          ty_step = -ty_step;
        ty += ty_step;

        matrix = m4.identity();
        matrix = m4.translate(matrix,tx,ty,0.0);
        //matrix = m4.zRotate(matrix, degToRad(theta));
        //matrix = m4.scale(matrix,0.25,0.25,1.0);
        gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);
        //gl.drawArrays(gl.TRIANGLES, 0, 6);
    
        

        // semi circulo (parte de cima)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setSemiCircleVertices3(gl, n,0.5, 0.0, -0.1); 
        gl.uniform3fv(colorUniformLocation,[0.17, 0.356, 0.530]);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);


        // semi circulo (janelas)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setSemiCircleVertices3(gl, n,0.4, 0.0, -0.1); 
        gl.uniform3fv(colorUniformLocation, [0.57, 0.56, 0.830]); 
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); 

        // retangulo (divisão da janela)
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        setRectangleVertices(gl,-0.05,-0.55,0.06,0.85);
        gl.uniform3fv(colorUniformLocation, [0.17, 0.356, 0.530]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);


        // retangulo (corpo)
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        setRectangleVertices(gl,-0.5,-0.55,1.0,0.5);
        gl.uniform3fv(colorUniformLocation, [0.17, 0.356, 0.530]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // retangulo (maçaneta)
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        setRectangleVertices(gl,-0.15,-0.2,0.1,0.04);
        gl.uniform3fv(colorUniformLocation, [0.75, 0.75, 0.75]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // semi circulo (frente do carro)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setSemiCircleVertices1(gl, n,0.25, -0.48, -0.30); 
        gl.uniform3fv(colorUniformLocation, [0.17, 0.356, 0.530]);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); 

        // semi circulo (frente do carro embaixo)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setSemiCircleVertices1(gl, n,0.05, -0.69, -0.50); 
        gl.uniform3fv(colorUniformLocation, [0.7, 0.556, 0.530]);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); 


        // semi circulo (atras do carro embaixo)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setSemiCircleVertices2(gl, n,0.05, 0.69, -0.50); 
        gl.uniform3fv(colorUniformLocation, [0.7, 0.556, 0.530]);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); 

        // semi circulo (atras do carro)**********
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setSemiCircleVertices2(gl, n,0.25, 0.48, -0.30); 
        gl.uniform3fv(colorUniformLocation, [0.17, 0.356, 0.530]);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); 

        // retangulo (maçaneta)
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        setRectangleVertices(gl,-0.7,-0.55,1.4,0.1);
        gl.uniform3fv(colorUniformLocation, [0.7, 0.556, 0.530]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);



        // circulo (farol dianteiro)
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        setCircleVertices(gl,n,0.07, -0.65, -0.3);
        gl.uniform3fv(colorUniformLocation, [0.9,0.9,0.9]);
        gl.drawArrays(gl.TRIANGLES, 0, 3*n);


        // semi circulo (farol traseiro)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setSemiCircleVertices2(gl, n,0.07, 0.65, -0.3);
        gl.uniform3fv(colorUniformLocation, [0.9, 0.2, 0.2]);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1); 



        //------ rodas       
        
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        setCircleVertices(gl,n,0.2, -0.35, -0.5);
        gl.uniform3fv(colorUniformLocation, [0.1, 0.1, 0.1]);
        gl.drawArrays(gl.TRIANGLES, 0, 3*n);

        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        setCircleVertices(gl,n,0.2, 0.35, -0.5);
        gl.uniform3fv(colorUniformLocation, [0.1, 0.1, 0.1]);
        gl.drawArrays(gl.TRIANGLES, 0, 3*n);

        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        setCircleVertices(gl,n,0.1, -0.35, -0.5);
        gl.uniform3fv(colorUniformLocation, [0.5, 0.5, 0.5]);
        gl.drawArrays(gl.TRIANGLES, 0, 3*n);

        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        setCircleVertices(gl,n,0.1, 0.35, -0.5);
        gl.uniform3fv(colorUniformLocation, [0.5, 0.5, 0.5]);
        gl.drawArrays(gl.TRIANGLES, 0, 3*n);

        
        
        requestAnimationFrame(drawCar);
    }

    drawCar();  

}
  
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
  
function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
  
var m4 = {
    identity: function() {
      return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];
    },

    multiply: function(a, b) {
      var a00 = a[0 * 4 + 0];
      var a01 = a[0 * 4 + 1];
      var a02 = a[0 * 4 + 2];
      var a03 = a[0 * 4 + 3];
      var a10 = a[1 * 4 + 0];
      var a11 = a[1 * 4 + 1];
      var a12 = a[1 * 4 + 2];
      var a13 = a[1 * 4 + 3];
      var a20 = a[2 * 4 + 0];
      var a21 = a[2 * 4 + 1];
      var a22 = a[2 * 4 + 2];
      var a23 = a[2 * 4 + 3];
      var a30 = a[3 * 4 + 0];
      var a31 = a[3 * 4 + 1];
      var a32 = a[3 * 4 + 2];
      var a33 = a[3 * 4 + 3];
      var b00 = b[0 * 4 + 0];
      var b01 = b[0 * 4 + 1];
      var b02 = b[0 * 4 + 2];
      var b03 = b[0 * 4 + 3];
      var b10 = b[1 * 4 + 0];
      var b11 = b[1 * 4 + 1];
      var b12 = b[1 * 4 + 2];
      var b13 = b[1 * 4 + 3];
      var b20 = b[2 * 4 + 0];
      var b21 = b[2 * 4 + 1];
      var b22 = b[2 * 4 + 2];
      var b23 = b[2 * 4 + 3];
      var b30 = b[3 * 4 + 0];
      var b31 = b[3 * 4 + 1];
      var b32 = b[3 * 4 + 2];
      var b33 = b[3 * 4 + 3];
      return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ];
    },

    translation: function(tx, ty, tz) {
      return [
          1,  0,  0,  0,
          0,  1,  0,  0,
          0,  0,  1,  0,
          tx, ty, tz, 1,
      ];
    },

    xRotation: function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      return [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1,
      ];
    },

    yRotation: function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
      ];
    },

    zRotation: function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      return [
          c, s, 0, 0,
        -s, c, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ];
    },

    scaling: function(sx, sy, sz) {
      return [
        sx, 0,  0,  0,
        0, sy,  0,  0,
        0,  0, sz,  0,
        0,  0,  0,  1,
      ];
    },

    translate: function(m, tx, ty, tz) {
      return m4.multiply(m, m4.translation(tx, ty, tz));
    },

    xRotate: function(m, angleInRadians) {
      return m4.multiply(m, m4.xRotation(angleInRadians));
    },

    yRotate: function(m, angleInRadians) {
      return m4.multiply(m, m4.yRotation(angleInRadians));
    },

    zRotate: function(m, angleInRadians) {
      return m4.multiply(m, m4.zRotation(angleInRadians));
    },

    scale: function(m, sx, sy, sz) {
      return m4.multiply(m, m4.scaling(sx, sy, sz));
    },

};
  
function radToDeg(r) {
  return r * 180 / Math.PI;
}

function degToRad(d) {
  return d * Math.PI / 180;
}


function setRectangleVertices(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
       x1, y1,
       x2, y1,
       x1, y2,
       x1, y2,
       x2, y1,
       x2, y2,
    ]), gl.STATIC_DRAW);
  }
  
  function setRectangleColor(gl,color) {
    colorData = [];
    for (let triangle = 0; triangle < 2; triangle++) {
      for(let vertex=0; vertex<3; vertex++)
        colorData.push(...color);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
  }
  
  function setCircleVertices(gl,n,radius, centerX, centerY){
    let center = [centerX, centerY];
    let vertexData = [];
    for(let i=0;i<n;i++){
      vertexData.push(...center);
      vertexData.push(centerX + radius*Math.cos(i*(2*Math.PI)/n), centerY + radius*Math.sin(i*(2*Math.PI)/n));
      vertexData.push(centerX + radius*Math.cos((i+1)*(2*Math.PI)/n), centerY + radius*Math.sin((i+1)*(2*Math.PI)/n));
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  }
  
  function setCircleColor(gl,n,color){
    colorData = [];
    for (let triangle = 0; triangle < n; triangle++) {
      for(let vertex=0; vertex<3; vertex++)
        colorData.push(...color);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
  }
  
  // Função para definir vértices do semicírculo (90 a 270)
  function setSemiCircleVertices1(gl, n, radius, centerX, centerY) {
    let center = [centerX, centerY]; // Centro do semicírculo
    let vertexData = [];
  
    // Adiciona o centro do semicírculo
    vertexData.push(...center);
  
  
    for (let i = n/2 ; i <= (3*n)/2; i++) {
      let angle = (i * Math.PI) / n; 
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);
      vertexData.push(x, y);
    }
  
    // Envia os dados dos vértices para o buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  }
  
  // Função para definir vértices do semicírculo (270 a 450)
  function setSemiCircleVertices2(gl, n, radius, centerX, centerY) {
    let center = [centerX, centerY]; // Centro do semicírculo
    let vertexData = [];
  
    // Adiciona o centro do semicírculo
    vertexData.push(...center);
  
  
    for (let i = (3*n)/2 ; i <= (5*n)/2; i++) {
      let angle = (i * Math.PI) / n; 
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);
      vertexData.push(x, y);
    }
  
    // Envia os dados dos vértices para o buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  }
  
  // Função para definir vértices do semicírculo (0 a 180)
  function setSemiCircleVertices3(gl, n, radius, centerX, centerY) {
    let center = [centerX, centerY]; // Centro do semicírculo
    let vertexData = [];
  
    // Adiciona o centro do semicírculo
    vertexData.push(...center);
  
  
    for (let i = 0 ; i <= n; i++) {
      let angle = (i * Math.PI) / n; 
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);
      vertexData.push(x, y);
    }
  
    // Envia os dados dos vértices para o buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  }
  


main();