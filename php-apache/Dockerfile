FROM php:8.0.8-apache
RUN buildDeps=" \
        wget \
        git \
        ssh \
        zip \
        libzip-dev \
        curl \
    "; \
    set -x \
    && apt-get update && apt-get install -y $buildDeps --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install  mysqli
RUN docker-php-ext-install  zip
RUN a2enmod rewrite
RUN apache2ctl restart
RUN wget https://getcomposer.org/installer -O - -q | php -- --quiet && \
    mv composer.phar /usr/local/bin/composer
RUN composer global require neoan3/neoan3 --ignore-platform-reqs
RUN mkdir -p /credentials \
    && echo "{\"neoan3_db\":{\"host\":\"mariadb\",\"name\":\"neoan3\",\"user\":\"neoan3\",\"password\":\"neoan3\",\"assumes_uuid\":true}}" >> /credentials/credentials.json
ENV PATH /root/.composer/vendor/bin:$PATH