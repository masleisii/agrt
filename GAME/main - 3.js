enchant();


/*
core�@�@�@�@�@�@�@�A�v���P�[�V�����̃��C�����[�v, �V�[�����Ǘ�����N���X.
- rootScene       �Q�[���̃V�[���B
-- Sprite (bear)�@�L�����N�^�[�̕��i�B�����bear�����B�摜�\���@�\���������N���X. Entity ���p�����Ă���.
*/


window.onload = function(){

  var core = new Core(320,320)
  core.preload('chara1.png');
  core.fps = 15;
  core.onload = function(){
    
    var bear = new Sprite(32,32);
    bear.image = core.assets['chara1.png'];
    bear.x = 0
    bear.y = 0
    
    bear.addEventListener('enterframe',function(){
      this.x += +10;
      if (this.x > 320) this.x = 0;
      this.rotate(2);
      this.scale(1.01,1.01);
    });
    
    core.rootScene.addChild(bear);

  }
  core.start();            

};

/*����*/

/*
�Ecore.star()���s���ƁA�t���[�����J�E���g�A�b�v����n�߂�
�E�V�����t���[���ɓ������ۂɓ�����w�肷�邱�Ƃ��ł���>>addEventListener('enterframe',function(){})
�E23�s�ڂ�this��bear���w��
�Ethis.x += +10;�@������10���������i�����ł�1�t���[�����Ƃ�10������
�Ecore.fps = 15;  core�ɑ΂��ăt���[�����ǂ̂��炢�̑��x�ŃJ�E���g�A�b�v����邩��ݒ�i�����ł�1�b��15�t���[���j
�Eif (this.x > 320) this.x = 0;  ������320�𒴂�����0�ɖ߂�
�Ethis.rotate(2);  1�t���[�����Ƃ�2�x����]������
�Ethis.scale(1.01,1.01); 1�t���[�����Ƃɑ傫������-1.01�{�A�c-1.01�{����
*/




