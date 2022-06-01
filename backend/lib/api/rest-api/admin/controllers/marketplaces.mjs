import CreateSession from '../../../../use-cases/olx/CreateSession.mjs';
import GetAdverts from '../../../../use-cases/marketplaces/GetAdverts.js';
import AutoriaSession from '../../../../use-cases/marketplaces/session/AutoriaSession.mjs';
import CloneAdvert from '../../../../use-cases/marketplaces/CloneAdvert.mjs';
import MarkAsSold from '../../../../use-cases/marketplaces/MarkAsSold.mjs';
import GetSoldStatistics from "../../../../use-cases/marketplaces/GetSoldStatistics.mjs";
import { makeUseCaseRunner } from '../../serviceRunner.mjs';

export default {
    createSession  : makeUseCaseRunner(CreateSession, req => ({ ...req.query, ...req.params, ...req.body })),
    getAdverts     : makeUseCaseRunner(GetAdverts, req => ({ ...req.query, ...req.params, ...req.body })),
    autoriaSession : makeUseCaseRunner(AutoriaSession, req => ({ ...req.query, ...req.params, ...req.body })),
    cloneAdvert    : makeUseCaseRunner(CloneAdvert, req => ({ ...req.query, ...req.params, ...req.body })),
    markAsSold     : makeUseCaseRunner(MarkAsSold, req => ({ ...req.query, ...req.params, ...req.body }), { withToken: true }),
    getSoldStatistics     : makeUseCaseRunner(GetSoldStatistics, req => ({ ...req.query, ...req.params, ...req.body }), { withToken: true })
};
