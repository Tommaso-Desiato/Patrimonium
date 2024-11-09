import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token and update auth status', () => {
    const token = 'test-token';
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(service['authStatus'], 'next');

    service.saveToken(token);

    expect(localStorage.setItem).toHaveBeenCalledWith(service['tokenKey'], token);
    expect(service['authStatus'].next).toHaveBeenCalledWith(true);
  });

  it('should get token from localStorage', () => {
    const token = 'test-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    const result = service.getToken();

    expect(localStorage.getItem).toHaveBeenCalledWith(service['tokenKey']);
    expect(result).toBe(token);
  });

  it('should remove token and update auth status', () => {
    spyOn(localStorage, 'removeItem').and.callThrough();
    spyOn(service['authStatus'], 'next');

    service.removeToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith(service['tokenKey']);
    expect(service['authStatus'].next).toHaveBeenCalledWith(false);
  });

  it('should return authentication status based on token presence', () => {
    spyOn(service, 'getToken').and.returnValue('test-token');

    const result = service.isAuthenticated();

    expect(result).toBe(true);
  });

  it('should return false if no token is present', () => {
    spyOn(service, 'getToken').and.returnValue(null);

    const result = service.isAuthenticated();

    expect(result).toBe(false);
  });
});
