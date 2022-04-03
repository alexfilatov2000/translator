export async function runUseCase(useCaseClass, { context = {}, params = {}}) {
    try {
        const result = await new useCaseClass({ context }).run(params);

        return result;
    } catch (error) {
        throw error;
    }
}

export function makeUseCaseRunner(
    useCaseClass,
    paramsBuilder,
    render = renderPromiseAsJson
) {
    return async function useCaseRunner(req, res, next) {
        const resultPromise = runUseCase(useCaseClass, {
            params  : paramsBuilder(req, res),
        });

        return render(req, res, resultPromise, next);
    };
}

export async function renderPromiseAsJson(req, res, promise, next) {
    try {
        const data = await promise;

        data.status = 1;

        return res.send(data);
    } catch (error) {
        console.log(error)
        res.send({
            status : 0,
            error  : {
                code    : 'SERVER_ERROR',
                message : 'Please, contact your system administartor!'
            }
        });
    }
}