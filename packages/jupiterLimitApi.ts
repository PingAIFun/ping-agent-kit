import axios, { type Response } from "redaxios";
import type {
  CancelJupiterOrderRequest,
  CancelJupiterOrderResponse,
  CreateJupiterOrderRequest,
  CreateJupiterOrderResponse,
  JupiterOrderHistoryResponse,
  OpenJupiterOrderResponse,
} from "../../types";

const jupiterApi = axios.create({
  baseURL: "https://api.jup.ag/limit/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

async function handleApiRequest<T>(
  apiCall: () => Promise<Response<T>>,
): Promise<T> {
  try {
    const { data } = await apiCall();
    return data;
  } catch (error) {
    throw new Error(
      `Jupiter API error: ${
        // @ts-expect-error - Redaxios error type mismatch
        error.message
      }`,
    );
  }
}

export async function createOrderApi(
  data: CreateJupiterOrderRequest,
): Promise<CreateJupiterOrderResponse> {
  return handleApiRequest(async () =>
    jupiterApi.post<CreateJupiterOrderResponse>("/createOrder", data),
  );
}

export async function getOpenOrdersApi(
  walletAddress: string,
): Promise<OpenJupiterOrderResponse[]> {
  return handleApiRequest(async () =>
    jupiterApi.get<OpenJupiterOrderResponse[]>("/openOrders", {
      params: { wallet: walletAddress },
    }),
  );
}

export async function cancelOrdersApi(
  data: CancelJupiterOrderRequest,
): Promise<CancelJupiterOrderResponse> {
  return handleApiRequest(async () =>
    jupiterApi.post<CancelJupiterOrderResponse>("/cancelOrders", data),
  );
}

export async function getOrderHistoryApi(
  walletAddress: string,
  page = 1,
): Promise<JupiterOrderHistoryResponse> {
  return handleApiRequest(async () =>
    jupiterApi.get<JupiterOrderHistoryResponse>("/orderHistory", {
      params: {
        wallet: walletAddress,
        page,
      },
    }),
  );
}
