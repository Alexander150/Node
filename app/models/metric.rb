class Metric < ApplicationRecord
	has_one :metric_value
	belongs_to :data_type, foreign_key: "type_metric", class_name: "DataType"
end
