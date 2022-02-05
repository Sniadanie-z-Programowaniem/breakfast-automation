import { prepareMessage } from '../prepare-message';

jest.mock('../prompts.ts', () => ({
    getEmojiIndicator: () => '👋',
    getSmallTalkPrompt: () => 'And another news',
}));

describe('prepare-message', () => {
    const MOCKED_DATE = new Date(2022, 1, 1, 10, 0, 0);

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(MOCKED_DATE);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    describe('should display title with', () => {
        test('single link', () => {
            const actual = prepareMessage({
                title: 'News title',
                links: ['https://babeljs.io/blog/2022/02/02/7.17.0'],
            });

            expect(actual).toBe(
                `👋 wtorek, 1 lutego 2022 10:00 | And another news **News title**\n\n- https://babeljs.io/blog/2022/02/02/7.17.0`,
            );
        });

        test('multiple links', () => {
            const actual = prepareMessage({
                title: 'News title',
                links: [
                    'https://babeljs.io/blog/2022/02/02/7.17.0',
                    'https://github.com/tc39/proposal-decorators/',
                    'https://frontlive.pl/blog/remix-konkurencja-dla-next-czy-bezuzyteczny-framework',
                ],
            });

            expect(actual).toBe(
                `\
👋 wtorek, 1 lutego 2022 10:00 | And another news **News title**\
\n\n- https://babeljs.io/blog/2022/02/02/7.17.0,\
\n- https://github.com/tc39/proposal-decorators/,\
\n- https://frontlive.pl/blog/remix-konkurencja-dla-next-czy-bezuzyteczny-framework`,
            );
        });
    });

    // todo handle those scenarios. Skipped for now

    describe.skip('should handle scenarios with missing data', () => {
        test('no links', () => {
            const actual = prepareMessage({
                title: 'News title',
                links: [],
            });

            expect(actual).toBe(`👋 wtorek, 1 lutego 2022 10:00 | And another news **News title**`);
        });

        test('no title', () => {
            const actual = prepareMessage({
                title: 'News title',
                links: [],
            });

            expect(actual).toBe(`👋 wtorek, 1 lutego 2022 10:00 | Linki do tematu:`);
        });

        // todo handle this scenario. Skipped for now
        test.skip('no title nor links', () => {
            const actual = prepareMessage({
                title: 'News title',
                links: [],
            });

            expect(actual).toBe(`Uh, chyba brakuje tytułu i odnośnika w tym newsie 😅`);
        });
    });
});
