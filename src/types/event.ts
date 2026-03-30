export type EventType = "PURCHASE" | "SEARCH" | "STREAM" | "ERROR";

export interface MusicEvent {
    id: string;
    type: EventType;
    timestamp: number;
    payload: PurchasePayload | SearchPayload | StreamPayload | ErrorPayload;
}

export interface PurchasePayload {
    trackName: string;
    artist: string;
    price: number;
    userId: string;
}

export interface SearchPayload {
    query: string;
    resultsCount: number;
}

export interface StreamPayload {
    trackName: string;
    artist: string;
    duration: number;
  }
  
  export interface ErrorPayload {
    message: string;
    code: number;
  }