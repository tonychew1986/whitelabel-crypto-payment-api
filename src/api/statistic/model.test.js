import { Statistic } from '.'

let statistic

beforeEach(async () => {
  statistic = await Statistic.create({ walletGenerationNumber: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = statistic.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(statistic.id)
    expect(view.walletGenerationNumber).toBe(statistic.walletGenerationNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = statistic.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(statistic.id)
    expect(view.walletGenerationNumber).toBe(statistic.walletGenerationNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
