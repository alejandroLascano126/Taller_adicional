export interface Ingrediente {
  nombre:   string;
  medida:   string;
}

export interface Receta {
  id:              string;
  nombre:          string;
  categoria:       string;
  region:          string;
  instrucciones:   string;
  thumbnailUrl:    string;
  videoUrl:        string | null;
  ingredientes:    Ingrediente[];   //  ← arreglo limpio
  fuente?:         string | null;
  fechaModificada?: string | null;
}

export function mapApiToReceta(api: any): Receta {
  const ingredientes: Ingrediente[] = [];

  for (let i = 1; i <= 20; i++) {
    const nombre = api[`strIngredient${i}`]?.trim();
    const medida = api[`strMeasure${i}`]?.trim();
    if (nombre) {
      ingredientes.push({ nombre, medida });
    }
  }

  return {
    id: api.idMeal,
    nombre: api.strMeal,
    categoria: api.strCategory,
    region: api.strArea,
    instrucciones: api.strInstructions,
    thumbnailUrl: api.strMealThumb,
    videoUrl: api.strYoutube || null,
    ingredientes,
    fuente: api.strSource || null,
    fechaModificada: api.dateModified || null
  };
}


