class MetricOperation < ApplicationRecord
  has_many :metric_values
  belongs_to :metric
end
