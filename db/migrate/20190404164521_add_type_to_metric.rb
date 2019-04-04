class AddTypeToMetric < ActiveRecord::Migration[5.2]
  def change
    add_column :metrics, :type_metric, :string
  end
end
