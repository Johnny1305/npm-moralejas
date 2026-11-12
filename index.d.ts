export = moralejas;

declare const moralejas: moralejas.MoralejasAPI;

declare namespace moralejas {
    interface Moraleja {
        id: number;
        text: string;
        language: string;
        category: string;
        tags: string[];
    }

    interface FilterOptions {
        category?: string;
        language?: string;
        tags?: string[];
    }

    interface RandomOptions extends FilterOptions {
        /** Evita repetir moralejas recientes. Por defecto: true. */
        avoidRepeat?: boolean;
        /** Cuántos IDs se recuerdan por combinación de filtros. Por defecto: 10. */
        historySize?: number;
        /** Historial explícito de IDs a evitar; el llamador deja de compartir estado. */
        history?: number[];
    }

    interface SearchOptions extends FilterOptions {
        /** Máximo de resultados. Por defecto: 20. */
        limit?: number;
    }

    interface HtmlStyles {
        fontFamily?: string;
        border?: string;
        padding?: string;
        borderRadius?: string;
        backgroundColor?: string;
        margin?: string;
        maxWidth?: string;
        boxShadow?: string;
        fontSize?: string;
        color?: string;
    }

    interface HtmlOptions {
        styles?: Partial<HtmlStyles>;
    }

    interface MoralejasAPI {
        random(options?: RandomOptions): Moraleja | undefined;
        randomMany(count?: number, options?: RandomOptions): Moraleja[];
        get(id: number | string): Moraleja | undefined;
        search(query: string, options?: SearchOptions): Moraleja[];
        categories(): string[];
        tags(): string[];
        toHTML(moraleja: Moraleja | string, options?: HtmlOptions): string;
        translate(text: string, language?: string): Promise<string>;
        translateMoraleja(
            moraleja: Moraleja | number,
            language?: string
        ): Promise<Moraleja>;
        randomTranslated(
            language?: string,
            options?: RandomOptions
        ): Promise<Moraleja>;
        translateHTML(
            moraleja: Moraleja | number,
            language?: string,
            options?: HtmlOptions
        ): Promise<string>;

        /** API original. */
        TXT(): string | undefined;
        HTML(options?: HtmlOptions & FilterOptions): string | undefined;
        TranslateTXT(language?: string): Promise<string>;
        TranslateHTML(
            language?: string,
            options?: HtmlOptions & FilterOptions
        ): Promise<string>;

        moralejas: Moraleja[];
    }
}
