import Base from '../../use-cases/Base.mjs';
import Product from '../../domain-model/Product.mjs';
import Statistic from '../../domain-model/Statistic.mjs';
import Currency from '../../domain-model/Currency.mjs';
import Source from '../../domain-model/Source.mjs';
import Detail from '../../domain-model/Detail.mjs';
import {Op} from "sequelize";
import {dumpSoldStatistics} from '../../utils/dumps.mjs';

export default class GetSoldStatistics extends Base {
    async execute() {

        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

        const products = await Product.findAll({
            include: [Currency, Source, Statistic, {
                model: Detail,
                where: {
                    createdAt: {[Op.gte]: firstDay}
                },
                required: false
            }],
            where: {
                userId: this.context.userId
            }
        })

        const sortedProducts = products.map(el => ({
            ...el,
            total: el.count * el.price
        })).sort((a, b) => b.total-a.total);

        const result = sortedProducts.map(dumpSoldStatistics)

        const statistics = {
            totalCount: 0,
            totalPrice: 0
        };
        for (const val of result) {
            val.forPeriod = {};
            val.forPeriod.totalCount = val.details.reduce((a, b) => a + (b['count'] || 0), 0);
            val.forPeriod.totalPrice = val.forPeriod.totalCount * val.price;

            statistics.totalCount = statistics.totalCount + val.count;
            statistics.totalPrice = statistics.totalPrice + val.count * val.price;
        }

        return {
            data : {
                products: result,
                statistics,
                forPeriod: {
                    totalCount: result.reduce((a, b) => a + (b?.forPeriod['totalCount'] || 0), 0),
                    totalPrice: result.reduce((a, b) => a + (b?.forPeriod['totalPrice'] || 0), 0),
                }
            }
        };
    }
}
