import { ListProvider } from '../ListProvider';
import { MockListProvider } from '../MockListProvider';
let useMock = false;

const ListProviderWrapper = useMock ? MockListProvider : ListProvider;

export default ListProviderWrapper;