import { Request, Response } from 'express';
export declare const getPurchaseOrders: (req: Request, res: Response) => Promise<void>;
export declare const getPurchaseOrderById: (req: Request, res: Response) => Promise<any>;
export declare const createPurchaseOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const receivePurchaseOrder: (req: Request, res: Response) => Promise<any>;
export declare const updateExpectedDate: (req: Request, res: Response) => Promise<any>;
export declare const cancelPurchaseOrder: (req: Request, res: Response) => Promise<any>;
//# sourceMappingURL=purchaseOrderController.d.ts.map