import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalElementService {
  api : string = 'https://167.172.209.210/api/v1/'
  status_de_secion=false


  constructor(private http: HttpClient) { }

  registrar(info:any):Observable<any>{
    console.log("ifo=",info);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(`${this.api}usuarios`,info, httpOptions)
  }
  


  
  login(item:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.post(`${this.api}usuariosLogin`,item, httpOptions)
  }


  getLavanderias():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}lavanderias`,httpOptions)
  }


  getServiciosLavanderia(id:any):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioLavanderia/${id}`,httpOptions)

  }

  getServiciosTintoreria(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioTintoreria/${id}`,httpOptions)
  }


  getServiciosPlanchados(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioPlanchado/${id}`,httpOptions)
  }


  getServiciosOtros(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioOtro/${id}`,httpOptions)
  }



  getServiciosOfertar(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioOferta/${id}`,httpOptions)
  }


solisitarservicio(item:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return  this.http.post(`${this.api}pedidos/`,item,httpOptions)
}


getLavanderia(id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return  this.http.get(`${this.api}lavanderias/${id}`,httpOptions)
}


getInfoUsuario(id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return  this.http.get(`${this.api}usuarios/${id}`,httpOptions)
}



editInfoUsuario(id:any, item:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return  this.http.put(`${this.api}usuarios_edit/${id}`,item,httpOptions)
}



getPedidosPorUsuario(id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return  this.http.get(`${this.api}pedidos_usuario/${id}`,httpOptions)
}



getPedidosPorId(id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return  this.http.get(`${this.api}pedidos/${id}`,httpOptions)
}


setStatusPedido(id:any,item:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  return  this.http.put(`${this.api}pedidos_repartidor_status/${id}`,item,httpOptions)
}


getRepartidor(id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  return  this.http.get(`${this.api}repartidores/${id}`,httpOptions)
}




getCoordenadasRepartidor(id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  return  this.http.get(`${this.api}repartidores_show_coords/${id}`,httpOptions)
  
}

getUsuarioCorreo(id:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return  this.http.get(`${this.api}usuarios_correo/${id}`,httpOptions)
}

cambiarcontraseña(id:any, item:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return  this.http.put(`${this.api}usuarios_cambiar_password/${id}`,item, httpOptions)
}


restablecer(info:any):Observable<any>{    
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return this.http.post(`https://gentle-springs-37285.herokuapp.com/`,info, httpOptions)
}


nuevaContrasenia(id:any,item:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  return  this.http.put(`${this.api}usuarios_cambiar_password/${id}`,item, httpOptions)
}

}
