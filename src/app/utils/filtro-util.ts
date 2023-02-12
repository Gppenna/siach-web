const cpfLength = 11;
const cnpjLength = 14;

export abstract class FiltroUtil {

  public static getFiltro(filtro:any) {
    
    const _q = Object.getOwnPropertyNames(filtro)
      .filter(f => f !== 'page' && f !== 'limit')
      .map(f => filtro[f] ? f + '=' + filtro[f] : null)
      .filter(f => null !== f);
    const filter = { _q: _q.join(';'), page: filtro.page, limit: filtro.limit };

    return filter;

  }
}
