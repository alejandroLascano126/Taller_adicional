import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RecursosService } from './servicios/recursos.service';
import { Receta } from './interfaz/receta';
import { mapApiToReceta } from './interfaz/receta'; // O la ruta correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  providers: [RecursosService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  getYoutubeThumbnail(url: string | null): string {
    const videoId = (url != null) ? url.split('v=')[1] : "";
    const ampersandPosition = videoId?.indexOf('&');
    const cleanId = ampersandPosition > -1 ? videoId.substring(0, ampersandPosition) : videoId;
    return `https://img.youtube.com/vi/${cleanId}/0.jpg`;
  }
  title = 'taller_adicional_web';
  receta: Receta[] = [];

  constructor(private recursosService: RecursosService) {
    this.recursosService.obtenerDatos().subscribe(respuesta => {
      const datosCrudos = (respuesta as any).meals || respuesta;
      this.receta = datosCrudos.map(mapApiToReceta);
    });
  }
  
  trackByRecetaId(index: number, receta: Receta): string {
    return receta.id;
  }

  selectedRecetaId: string | null = null;

  toggleInstrucciones(id: string) {
    this.selectedRecetaId = this.selectedRecetaId === id ? null : id;
  }


}
