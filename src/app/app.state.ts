import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

import {
  BehaviorSubject,
  forkJoin,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { delay, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './core/security/authentication-service';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  @Output()
  sheetEvent = new EventEmitter<any>();

  USER_EMAIL_SESSION_ATTRIBUTE = 'authenticatedUserEmail';
  USER_AUTHORITY_SESSION_ATTRIBUTE = 'authenticatedUserAuthority';
  USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUserName';
  USER_COURSE_SESSION_ATTRIBUTE = 'authenticatedUserCourse';
  
  static commands = {
    INITILIZE: 'initialize',
    HTTP_REQUEST: 'http-request',
    REGISTER_SHEET: 'register-sheet',
    OPEN_BOTTOM_SHEET: 'open-bottom-sheet',
    TOGGLE_DARK_THEME: 'toggle_dark_theme',
    ACTUAL_THEME: 'actual_theme',
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTRAR : 'registrar'
  };

  static APIS: { [key: string]: any } = {
    ASSETS: undefined,
    HUB_DEFAULT: '',
    URL_SYNC_USER: undefined,
  };

  private initialState: any = {
    loadingGlobal: false,
    initialized: false,
    userLogged: false,
    ready: false,
    menu: undefined,
    userData: undefined
  };
  private state$: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.initialState
  );
  public get state(): any {
    return this.state$.getValue();
  }

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private http: HttpClient,
    private readonly snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private overlayContainer: OverlayContainer
  ) {
    this.routerHandler();
    AppStateService.APIS.ASSETS = "/assets/json/data/";
    this.initialize().subscribe();
  }

  getState(): Observable<any> {
    return this.state$.asObservable();
  }

  protected setState(newState: any) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }

  public getAuthority() {
    return sessionStorage.getItem(this.USER_AUTHORITY_SESSION_ATTRIBUTE);
  }
  public execute(command: { type: string; data?: any }): Observable<any> {
    switch (command.type) {
      case AppStateService.commands.INITILIZE:
        return this.initialize();

      case AppStateService.commands.ACTUAL_THEME:
        return this.checkTheme();

      case AppStateService.commands.LOGIN:
        return this.login(command.data);

      case AppStateService.commands.REGISTRAR:
        return this.registrar(command.data);

      case AppStateService.commands.LOGOUT:
        return this.logout();

      case AppStateService.commands.TOGGLE_DARK_THEME:
        return of(this.toggleTheme());

      case AppStateService.commands.HTTP_REQUEST:
        return this.httpRequest(command.data);

      case AppStateService.commands.REGISTER_SHEET:
        this.setState({ openSheet: undefined });
        return of(this.registerSheet(command.data));

      case AppStateService.commands.OPEN_BOTTOM_SHEET:
        return of(this.setState({ openSheet: command.data }));

      default:
        const message = `comando desconhecido :: ${command.type}`;
        return throwError({ message: message });
    }
  }

  private registrar(form:any) : Observable<any> {
    return of(this.http.post(`${environment.apiUrl}register`, form).subscribe((response:any) => {
      console.log("registrar", response);
      this.snackBar.open('Cadastro realizado com sucesso!', 'Ok', {
        duration: 6000,
        panelClass: ['green-snackbar']
      });
      this.router.navigate(['/login']);
    }));
  }

  private getUserInfo(name:any): Observable<any> {
    return this.httpRequest({type: 'GET', api: environment.apiUrl, path: 'user', query: `name=${name}` });
  }

  private login(credentials:any): Observable<any> {
    return of(this.authenticationService.authenticate(credentials).subscribe((response:any) => {
      this.getUserInfo(response.name).subscribe((request:any) => {
        this.setState({
          user: request
        });
        sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE, request.nome);
        sessionStorage.setItem(this.USER_COURSE_SESSION_ATTRIBUTE, request.idCurso);
      });
      if(this.router.url === '/login') {
        this.router.navigate(['/inicio']);
      }
      sessionStorage.setItem(this.USER_EMAIL_SESSION_ATTRIBUTE, response.name);
      sessionStorage.setItem(this.USER_AUTHORITY_SESSION_ATTRIBUTE, response.authorities[0].authority);
    }));
  }

  private logout() {
    return of(this.authenticationService.logout().subscribe((response:any) => {
      sessionStorage.removeItem(this.USER_EMAIL_SESSION_ATTRIBUTE);
      sessionStorage.removeItem(this.USER_AUTHORITY_SESSION_ATTRIBUTE);
      sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE);
      sessionStorage.removeItem(this.USER_COURSE_SESSION_ATTRIBUTE);
      this.setState({
        user: undefined
      });
    }));
  }

  isUserLoggedIn(): Observable<any> {
    return this.getUserInfo(sessionStorage.getItem(this.USER_EMAIL_SESSION_ATTRIBUTE));
  }

  private initialize(): Observable<any> {
    this.setState({
      initialized: true,
    });

    const requestConfig = {
      type: 'GET',
      api: AppStateService.APIS.ASSETS,
      path: 'app-config.json',
    };
    
    return this.execute({
      type: AppStateService.commands.HTTP_REQUEST,
      data: requestConfig,
    }).pipe(
      tap((result:any) => {
        this.setState({
          ready: true,
          menu: result.menu,
        });
      })
    );
  }

  private httpRequest(request: {
    type: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    api: string;
    path: string;
    headers?: any;
    query?: string;
    body?: any;
    skipValidation?: boolean;
  }): Observable<any> {
    const url = `${request.api}${request.path}${
      request.query ? '?' + request.query : ''
    }`;
    console.log('HTTP REQUEST', request);

    return of(request.type).pipe(
      switchMap((type) => {
        console.log('TYPE', request);
        if (type === 'GET') {
          return request.headers
            ? this.http
                .get(url, {
                  headers: request.headers,
                  responseType: 'blob' as 'json'
                })
            : this.http.get(url);
        }
        if (type === 'PUT') {
          console.log('PUT: ', request.body);
          return this.http.put(url,request.body);
        }
        if (type === 'POST') {
          console.log('POST: ', request.body);
          return this.http.post(url,request.body);
        }
        if (type === 'PATCH') {
          return this.http.patch(url, request.body);
        }
        if (type === 'DELETE') {
          return this.http.delete(url);
        }
        const message = `metodo HTTP desconhecido :: ${type}`;
        return throwError({ message: message });
      })
    );
  }

  toggleTheme(): void {
    this.state.isDark = !this.state.isDark;
    if (this.state.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer
        .getContainerElement()
        .classList.remove('dark-theme');
    }
  }

  checkTheme() {
    return this.state.isDark;
  }

  private routerHandler() {
    this.router.events
      .pipe(
        tap((event) => {
          if (event instanceof NavigationEnd) {
          } else if (event instanceof NavigationStart) {
            this.setState({
              loadingGlobal: true
            });
          }
        }),
        delay(1500),
        tap((event) => {
          if (event instanceof NavigationEnd) {
            this.setState({ loadingGlobal: false });
          } else if (event instanceof NavigationStart) {
          }
        })
      )
      .subscribe();
  }

  private registerSheet(data: any) {
    console.log('REGISTERSHEET', data);

    data.sheet.afterDismissed().subscribe((value: any) => {
      console.log('afterDismissed', value);
      if (data.value.backSearch && data.componentInstance.actionComplete) {
        console.log(data);
        data.value.backSearch.func(data.value.backSearch.parameter);
      } else {
        if (data.componentInstance.actionComplete) {
          if(data.value.hasOwnProperty('router')) {
            this.router.navigate([data.value.router], { relativeTo: this.route });
          }
          else if(data.value.hasOwnProperty('reload') && data.value.reload === true) {
            window.location.reload();
          }
          
        }
      }
    });
    data.sheet.afterOpened().subscribe((value: any) => {
      console.log('afterOpened', value);
      this.manageSheetActions(data.sheet, data.componentInstance, data.value);
      data.componentInstance.onConnectedToParent();
    });
  }

  private manageSheetActions(sheet: any, component: any, valueRef: any) {
    console.log('manageSheetActions', sheet, component, valueRef);
    const hasLog = component.getLogs;
    const dependencies = component.dependencies;
    component.defaultValues = valueRef;
    component.initialize.subscribe((value: any) => {
      of({})
        .pipe(
          tap(() => {
            component.initFormControl(valueRef.data, valueRef);
          }),
          mergeMap(() => {
            return this.loadDependencies(dependencies, valueRef);
          }),
          tap((result) => {
            console.log('deps :::::: complete ::: ', result);
            component.dependenciesData = result;
          })
        )
        .subscribe(
          (result) => {
            console.log('initialize complete :: ', value, dependencies);
            component.loading = false;
          },
          (error: any) => {
            console.log('error >>> ', error);
            component.loading = false;
            component.error = error;
          }
        );
      console.log('initialize', value, dependencies);
    });

    if (hasLog) {
      component.getLogs.subscribe((value: any) => {
        console.log('getLogs', value);
      });
    }

    if (component.httpRequest) {
      component.httpRequest.subscribe((value: any) => {
        console.log('httpRequest', value, valueRef);
        const path = this.replaceValuesFromSource(value.path, '/', valueRef);
        const query = this.replaceValuesFromSource(value.query, '&', valueRef);
        const requestData = {
          api: value.api,
          type: value.type,
          path: path,
          query: query,
          body: value.body,
        };

        this.execute({
          type: AppStateService.commands.HTTP_REQUEST,
          data: requestData,
        })
          .pipe(
            tap((value: any) => {
              component.actionComplete = true;
              if (component.hasOwnProperty('_actionResponseData')) {
                component.actionResponseData = value;
              }
            }),
            delay(150)
          )
          .subscribe(
            () => {
              component.loading = false;
              component.actionComplete = true;
              this.sheetEvent.emit(true);
            },
            (error: any) => {
              console.log('error >>> ', error);
              component.loading = false;
              component.error = error;
            }
          );
      });
    }

    if (component.executeAction) {
      component.executeAction.subscribe((value: any) => {
        this.execute(value).subscribe();
      });
    }

    if (component.cancel) {
      component.cancel.subscribe((value: any) => {
        console.log('>>>> cancel :: ', value);
      });
    }
  }

  private loadDependencies(deps: any, refsObject?: any) {
    if (!deps) {
      return of(undefined);
    }
    const requests: any = {};
    Object.keys(deps).forEach((key: string) => {
      const path = this.replaceValuesFromSource(
        deps[key].path,
        '/',
        refsObject
      );
      deps[key].path = path;

      const query = this.replaceValuesFromSource(
        deps[key].query,
        '&',
        refsObject
      );
      deps[key].query = query;

      requests[key] = this.execute({
        type: AppStateService.commands.HTTP_REQUEST,
        data: deps[key],
      });
    });
    return forkJoin(requests);
  }

  private replaceValuesFromSource(
    replace: string,
    split: string = '/',
    values?: any
  ) {
    if (!replace) {
      return replace;
    }
    const parts = replace.split(split);
    let result = '';
    parts.forEach((part) => {
      if (part.indexOf('#') !== -1) {
        result += `${split}${this.replaceFromSource(part, values)}`;
      } else {
        result += `${split}${part}`;
      }
    });
    return result.replace(split, '');
  }

  private replaceFromSource(replace: string, values?: any) {
    try {
      const ref =
        replace.indexOf('=') !== -1
          ? replace.split('=')[1].replace('#', '')
          : replace.replace('#', '');
      return replace.indexOf('=') !== -1
        ? `${replace.split('=')[0]}=${values[ref]}`
        : values[ref];
    } catch (error) {
      throw new Error(
        'Configure corretamente os objetos e relações :: [' +
          replace +
          '] não existe em ::' +
          JSON.stringify(values)
      );
    }
  }
}

