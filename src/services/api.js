const STORAGE_KEY = 'fist_and_form_save_v1';

export const api = {
    saveGameState: async (gameState) => {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
            return { success: true };
        } catch (error) {
            console.error('Save failed:', error);
            return { success: false, error };
        }
    },

    loadGameState: async () => {
        try {
            const data = sessionStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Load failed:', error);
            return null;
        }
    },

    clearSave: async () => {
        sessionStorage.removeItem(STORAGE_KEY);
    }
};
