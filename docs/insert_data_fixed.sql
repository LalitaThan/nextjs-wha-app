-- product_images (product_id 6-10)
INSERT INTO `product_images` (`product_id`, `image_name`) VALUES
(6, 'iphone16pro-front.jpg'),
(6, 'iphone16pro-back.jpg'),
(7, 'galaxy-s25-front.jpg'),
(8, 'macbook-air-m3-silver.jpg'),
(9, 'airpods-pro2-case.jpg');

-- orders (customer_id 6-10)
INSERT INTO `orders` (`date`, `customer_id`, `status`, `total_amount`) VALUES
('2026-06-01 09:30:00', 6, 'delivered', 100790.00),
('2026-06-01 14:15:00', 7, 'delivered', 53890.00),
('2026-06-02 10:00:00', 8, 'processing', 41890.00),
('2026-06-02 16:45:00', 9, 'received', 78800.00),
('2026-06-03 08:20:00', 10, 'processing', 79800.00);

-- order_items (order_id 1-5, product_id 6-10)
INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 6, 2, 45900.00),
(1, 9, 1, 8990.00),
(2, 8, 1, 44900.00),
(2, 9, 1, 8990.00),
(3, 7, 1, 32900.00),
(3, 9, 1, 8990.00),
(4, 8, 1, 44900.00),
(4, 10, 1, 33900.00),
(5, 6, 1, 45900.00),
(5, 10, 1, 33900.00);