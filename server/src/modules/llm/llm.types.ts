export interface GeminiGenerateContentResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export interface GeminiJsonSchema {
  type: string;
  properties?: Record<string, unknown>;
  required?: string[];
  items?: GeminiJsonSchema;
}
