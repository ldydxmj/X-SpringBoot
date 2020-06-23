package com.suke.czx.modules.yewu.entity;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.*;

import java.io.Serializable;
import java.util.Date;


/**
 * APK版本管理
 * 
 * @author czx
 * @email object_czx@163.com
 * @date 2019-04-28 15:56:33
 */
@Data
@Builder
@TableName("tb_yewu")
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Yewu extends Model<Yewu> implements Serializable {
	private static final long serialVersionUID = 1L;

		//
		@TableId
		private Long id;
		//名
		private String name;
		//标题
		private String title;
		//价格
		private Double price;
}
