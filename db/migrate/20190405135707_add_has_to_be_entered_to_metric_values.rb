class AddHasToBeEnteredToMetricValues < ActiveRecord::Migration[5.2]
  def change
    add_column :metric_values, :has_to_be_entered, :boolean
  end
end
