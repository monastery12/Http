/*
数据库类型
Sequelize.STRING                      // VARCHAR(255)                  类型：字符串 最大值： 65535个字符
Sequelize.STRING(1234)                // VARCHAR(1234)                 类型：变长 最大值： 65535个字符
Sequelize.TEXT                        // TEXT                          类型：字符串 最大值：65535个字符
Sequelize.TEXT('tiny')                // TINYTEXT                      类型：字符串 最大值：255个字符

Sequelize.INTEGER                     // INTEGER                       类型：整型 最大值：范围(-2147483648~2147483647)
Sequelize.BIGINT                      // BIGINT                        类型：整型 最大值：范围(+-9.22*10的18次方)
Sequelize.BIGINT(11)                  // BIGINT(11)                    类型：整型 最大值：范围(+-9.22*10的18次方)

Sequelize.FLOAT                       // FLOAT                         类型：单精度浮点型  8位精度(4字节)
Sequelize.FLOAT(11)                   // FLOAT(11)                     类型：单精度浮点型 8位精度(4字节)
Sequelize.FLOAT(11, 12)               // FLOAT(11,12)                  类型：精度浮点型 8位精度(4字节) m总个数，d小数位


Sequelize.DOUBLE                      // DOUBLE                        类型：双精度浮点型 16位精度(8字节)
Sequelize.DOUBLE(11)                  // DOUBLE(11)                    类型：双精度浮点型 16位精度(8字节)
Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)                 类型：双精度浮点型 16位精度(8字节) m总个数，d小数位

Sequelize.DECIMAL                     // DECIMAL                       类型：定点数型
Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)                 类型：定点数型 参数m<65 是总个数，d<30且 d<m 是小数位

Sequelize.DATE                        // DATETIME                      类型：日期时间类型 范例：'2009-05-12 02:31:44'
Sequelize.DATE(6)                     // DATETIME(6)
Sequelize.DATEONLY                    // DATE without time.
Sequelize.BOOLEAN                     // TINYINT(1)                    类型：整型 范围(-128~127)

Sequelize.ENUM('value 1', 'value 2')  // ENUM                          类型：枚举

Sequelize.BLOB                        // BLOB                          类型：二进制数据
Sequelize.BLOB('tiny')                // TINYBLOB                      类型：二进制数据

需要的module
npm install querystring --save

npm install --save co

npm install --save sequelize

npm install --save mysql
 */