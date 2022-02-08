import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InvoiceDocument, InvoiceEntity } from '../../../package/schema/invoice.schema';
import { InvoiceDto } from '../../../package/dto/invoice.dto';
import { CreatedByAppendService } from '../../../package/service/created-by-append.service';

@Injectable()
export class InvoiceService {
    private readonly logger = new Logger(InvoiceService.name);

    constructor(
        @InjectModel(InvoiceEntity.name)
        private readonly invoiceModel: Model<InvoiceDocument>,
        private readonly createdByAppendService: CreatedByAppendService,
    ) {}

    createInvoice = async (invoiceInput: InvoiceDto): Promise<InvoiceDocument> => {
        // saving and returning the saved data in mongo db
        try {
            invoiceInput.invoiceNo = await this.generateUniqueInvoiceNo();
            invoiceInput.products = (invoiceInput.products || []).filter((product, productIndex, products) => {
                return productIndex === products.findIndex((prod) => prod.productID === product.productID);
            });
            invoiceInput = this.createdByAppendService.createdBy<InvoiceDto>(invoiceInput);
            return await this.invoiceModel.create(invoiceInput);
        } catch (e) {
            return e;
        }
    };

    async pagination(page: number, limit?: number): Promise<InvoiceDocument[]> {
        const query = this.invoiceModel.find().where({ isActive: true });
        if (page && limit) {
            query.skip((page - 1) * limit).limit(limit);
        }
        query
            .populate('createdBy', 'email')
            .populate('products.productID', 'productName packSize')
            .populate('client', 'code name contact billing shipping email address');

        return await query.exec();
    }

    async update(id: string, invoiceData: InvoiceDto): Promise<InvoiceDocument> {
        invoiceData.products = (invoiceData.products || []).filter((product, productIndex, products) => {
            return productIndex === products.findIndex((prod) => prod.productID === product.productID);
        });
        return this.invoiceModel.findByIdAndUpdate(
            id,
            { ...invoiceData },
            {
                returnOriginal: false,
            },
        );
    }

    async remove(_id: string): Promise<InvoiceDocument> {
        try {
            return await this.invoiceModel.findByIdAndUpdate(
                _id,
                {
                    $set: { isActive: false },
                },
                {
                    returnOriginal: false,
                },
            );
        } catch (error) {
            return error;
        }
    }

    /*************** custom () **********/
    async findById(_id: string): Promise<InvoiceDocument[]> {
        try {
            return await this.invoiceModel
                .findById(_id)
                .where({ isActive: true })
                .populate('createdBy', 'email')
                .populate('products.productID', 'productName packSize')
                .populate('client', 'code name contact billing shipping email address');
        } catch (error) {
            console.log(error);
        }
    }

    async generateUniqueInvoiceNo(): Promise<string> {
        const prefix = 'INV-';
        const randomString = (toLength) => {
            const salt = '0123456789';
            const saltLength = salt.length;
            let result = '';
            for (let i = 0; i < toLength; i++) {
                result += salt.charAt(Math.floor(Math.random() * saltLength));
            }
            return result;
        };
        const checkInvoiceExistsAndUnique = async (toCheckInvoiceNo) => {
            const available = await this.invoiceModel.find({ invoiceNo: toCheckInvoiceNo }).count();
            if (available > 0) {
                const checkAgainCoupon = randomString(10);
                await checkInvoiceExistsAndUnique(checkAgainCoupon);
            } else {
                return toCheckInvoiceNo;
            }
        };

        const randomCoupon = randomString(10);
        return prefix + (await checkInvoiceExistsAndUnique(randomCoupon));
    }
}
