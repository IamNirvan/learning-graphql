import SessionManager from './session.manager';
 
const Keycloak = require('keycloak-connect');
 
class KeyCloakManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: KeyCloakManager;
 
  public keycloak;
 
  private constructor() {
    const kcConfig = {
        clientId: "api-service",
        secret: "AH8wD4IEApuSN00WPhU2LvsUO10mO72J",
        bearerOnly: true,
        serverUrl: "http://localhost:8080/",
        resource: "api-service",
        realm: "test-realm",
        realmPublickey:
          "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwvkxGs6/QmJF7oJuT7ybc6y88RtVaPIxi3iQWjAYlZbooo5j8t2ZWuIuo3BnvzN7Mm76yRlisDJU6GiOKE4Iq5SNUJKCzk9o78UL6YhRja6L57Jwiz0fMs5TlwRtkpC/DisFj+cQ7hb0HIx9fCBdhoMoSB1FRPnaWv+aDmEFMu8+agFxZeK+l0ojSrSxmj5b1lMdZMkDpIssYBz1DllrqlejShhlBds5D9pDbR4mAHn5zSwaft85dX05b9phCGF15MIO6PvCchw8NiHFy9KouVlikrSu1yGGrQxurMvgk11lvzr8EbvH2rY5lMkVKJmiNsgjp0YSBcygs8/1J6yNWQIDAQAB",
    };
    this.keycloak = new Keycloak({ store: SessionManager.getInstance().memoryStore }, kcConfig);
  }
 
  public static getInstance(): KeyCloakManager {
    if (!this.instance) {
      this.instance = new KeyCloakManager();
    }
    return this.instance;
  }
}
 
export default KeyCloakManager;