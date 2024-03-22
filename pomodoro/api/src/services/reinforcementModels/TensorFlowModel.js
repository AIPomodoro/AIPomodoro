import * as tf from '@tensorflow/tfjs-node'
import { ReinforcementModel, reinforcementModel, updateReinforcementModel } from './reinforcementModels'

export const createModel = () => {
  const model = tf.sequential()

  model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [1] }))
  model.add(tf.layers.dense({ units: 64, activation: 'relu' }))
  model.add(tf.layers.dense({ units: 1 }))

  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' })

  return model;
}


export const updateModel = (userId, rating) => {
  const rlModel = reinforcementModel(userId)
  const modelData = rlModel.modelData

  if (rlModel) {
    const updatedModelData = modelData.add(tf.scalar(rating))

    const updatedModel = rlModel;
    updatedModel.modelData = updatedModelData
    updateReinforcementModel(userId, updatedModel)
  }
}