import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as string;

  // se valor nao for minusculo, retorno true para exibir um erro
  if (valor !== valor.toLocaleLowerCase()) {
    return { minusculo: true };
  } else {
    return null;
  }
}
