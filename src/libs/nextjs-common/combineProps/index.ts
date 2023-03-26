import axios from 'axios';
import { assign } from 'lodash';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

export interface Runner<T> {
    (context: GetStaticPropsContext | GetServerSidePropsContext): Promise<Record<string, any>>;
}

const combineProps = async <T extends GetStaticPropsContext | GetServerSidePropsContext>(context: T, ...runners: Runner<T>[]) => {
    const caller = runners.map((runner) => runner(context));
    const response = await axios.all(caller);
    const data = assign({}, ...response);
    return data;
};

export default combineProps;
