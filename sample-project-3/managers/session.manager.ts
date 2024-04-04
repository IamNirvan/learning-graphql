import session from 'express-session';
 
class SessionManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: SessionManager;
 
  public memoryStore: session.MemoryStore;
 
  private constructor() {
    this.memoryStore = new session.MemoryStore();
  }
 
  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }
}
 
export default SessionManager;