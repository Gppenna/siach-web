import { HttpParams } from '@angular/common/http';

export class HttpUtils {
  /**
   * Constrói um objeto HttpParams a partir de um objeto JS.
   *
   * @param searchParams objeto criado.
   */
  static buildHttpParams(searchParams: { [name: string]: any }): HttpParams {
    let params = new HttpParams();

    if (searchParams) {
      Object.keys(searchParams).forEach((k) => {
        if (
          searchParams[k] ||
          searchParams[k] === 0 ||
          searchParams[k] === false
        ) {
          const value = searchParams[k];
          if (value instanceof Array) {
            value.forEach((item) => {
              params = params.append(k, this.valueToString(item));
            });
          } else {
            params = params.append(k, this.valueToString(value));
          }
        }
      });
    }

    return params;
  }

  private static valueToString(value: any): string {
    let valueStr: string;

    if (value instanceof Date) {
      valueStr = value.toISOString();
    } else {
      valueStr = `${value}`;
    }

    return valueStr;
  }

  /**
   * Substitui o valor de cadas propriedade do objeto, incluindo objetos internos e array.
   * Substituições:
   * - Date para String, usando Date.toISOString();
   * @param obj objeto que terá suas propriedades substituídas.
   */
  static ajustValueObj(obj: any) {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (value) {
        if (Array.isArray(value)) {
          Array.from(value).forEach((valueArray, index) => {
            this.ajustValue(value, (valueStr) => {
              value[index] = valueStr;
            });
          });
        } else {
          this.ajustValue(value, (valueStr) => {
            obj[key] = valueStr;
          });
        }
      }
    });
  }

  private static ajustValue(value: any, callback: (value: string) => void) {
    if (value instanceof Date) {
      const valueStr = value.toISOString();
      callback(valueStr);
    } else if (value instanceof Object) {
      this.ajustValueObj(value);
    }
  }
}
